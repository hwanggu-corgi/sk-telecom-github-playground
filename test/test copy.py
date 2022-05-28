import sys
import os.path
import subprocess
import unittest

class TestHugo(unittest.TestCase):
  def setUp(self) -> None:
    self.dirPath = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
    self.executable = "start.sh"
    self.timeExpOut = self.timeExpErr = None

    try:
      self.proc = subprocess.run(["sh", os.path.join(self.dirPath, self.executable)], timeout=10, capture_output=True, text=True)
    except subprocess.TimeoutExpired as timeErr:
      print("------stdout------")
      self.timeExpOut = timeErr.stdout.decode().lower() if timeErr.stdout is not None else timeErr.stdout
      print("------stderr------")
      self.timeExpErr = timeErr.stderr.decode().lower() if timeErr.stderr is not None else timeErr.stderr

  def tearDown(self) -> None:
    super().tearDown()


  def test_start_command_should_show_web_server_is_starting (self) -> None:
    expected = True
    result = self.timeExpOut.find( "web server is available at //localhost:") != -1
    print(self.timeExpOut)
    self.assertEqual(expected, result)

if __name__ == '__main__':
    unittest.main()