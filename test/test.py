import os, os.path
import subprocess, signal
import unittest

class TestHugo(unittest.TestCase):
  def setUp(self) -> None:
    dirPath = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
    executable = "start.sh"
    timeout = 10

    try:
      self.proc = subprocess.run(["sh", os.path.join(dirPath, executable)], timeout=timeout, capture_output=True, text=True)
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
        os.kill(pid, signal.SIGKILL)

  def test_start_command_should_not_return_error (self) -> None:
    expected = True

    if self.timeExpErr is None:
      result = True
    else:
      result = False

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