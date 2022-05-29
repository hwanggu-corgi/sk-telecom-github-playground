import psutil
import time
import os, os.path
import subprocess, signal
import unittest

class TestHugo(unittest.TestCase):
  def setUp(self) -> None:
    dirPath = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
    executable = "start.sh"
    timeout = 10

    # This solution because microsoft server hangs when running test: https://stackoverflow.com/questions/48763362/python-subprocess-kill-with-timeout#answer-48763628
    self.proc = subprocess.Popen(["sh", os.path.join(self.dirPath, self.executable)], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    for _ in range(30):
      if self.proc.poll() is not None:
        break
      time.sleep(1)
    else:
      # the for loop ended without break: timeout
      parent = psutil.Process(self.proc.pid)
      for child in parent.children(recursive=True):  # or parent.children() for recursive=False
          child.kill()
      parent.kill()

    try:
      self.proc = subprocess.run(["sh", os.path.join(dirPath, executable)], timeout=timeout, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    except subprocess.TimeoutExpired as timeErr:
      self.timeExpOut = timeErr.stdout.decode().lower() if timeErr.stdout is not None else timeErr.stdout
      self.timeExpErr = timeErr.stderr.decode().lower() if timeErr.stderr is not None else timeErr.stderr

  def tearDown(self) -> None:
    super().tearDown()

    # Reference:
    p = subprocess.Popen(['ps', '-A'], stdout=subprocess.PIPE)
    out, err = p.communicate()
    for line in out.splitlines():
      if 'hugo server' in line.decode():
        pid = int(line.split(None, 1)[0])
        os.kill(pid, signal.SIGKILL)

  def test_start_command_should_not_return_error (self) -> None:
    expected = True

    if self.timeExpErr is None:
      result = True
    else:
      result = False
      print(self.timeExpErr)
    self.assertEqual(expected, result)


  def test_start_command_should_show_web_server_is_starting (self) -> None:
    expected = True

    if self.timeExpOut is None:
      result = False
    else:
      result = self.timeExpOut.find( "web server is available at //localhost:") != -1

    self.assertEqual(expected, result)

if __name__ == '__main__':
    unittest.main()