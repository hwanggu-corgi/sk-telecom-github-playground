import sys
import os, os.path
import subprocess, signal
import unittest

class TestHugo(unittest.TestCase):
  def setUp(self) -> None:
    self.dirPath = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
    self.executable = "start.sh"
    self.timeExpOut = self.timeExpErr = None

    try:
      self.proc = subprocess.run(["sh", os.path.join(self.dirPath, self.executable)], timeout=10, capture_output=True, text=True)
    except subprocess.TimeoutExpired as timeErr:
      self.timeExpOut = timeErr.stdout.decode().lower() if timeErr.stdout is not None else timeErr.stdout
      self.timeExpErr = timeErr.stderr.decode().lower() if timeErr.stderr is not None else timeErr.stderr

  def tearDown(self) -> None:
    super().tearDown()

    p = subprocess.Popen(['ps', '-A'], stdout=subprocess.PIPE)
    out, err = p.communicate()
    for line in out.splitlines():
      if 'hugo server' in line.decode():
        pid = int(line.split(None, 1)[0])
        print(pid)
        os.kill(pid, signal.SIGKILL)

  def test_start_command_should_show_web_server_is_starting (self) -> None:
    expected = True

    if self.timeExpOut is None:
      result = False
    else:
      result = self.timeExpOut.find( "web server is available at //localhost:") != -1
    print(self.timeExpErr)
    self.assertEqual(expected, result)

if __name__ == '__main__':
    unittest.main()