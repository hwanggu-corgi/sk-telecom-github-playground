import sys
import os.path
import subprocess
import unittest

class TestHugo(unittest.TestCase):
  def setUp(self):
    self.dirPath = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
    self.executable = "start.sh"
    self.timeExpOut = self.timeExpErr = None

    try:
      self.proc = subprocess.run(["sh", os.path.join(self.dirPath, self.executable)], timeout=10, capture_output=True, text=True)
    except subprocess.TimeoutExpired as timeErr:
      print("------stdout------")
      self.timeExpOut = timeErr.stdout.lower() if timeErr.stdout is not None else timeErr.stdout
      print("------stderr------")
      self.timeExpErr = timeErr.stderr.lower() if timeErr.stderr is not None else timeErr.stderr


  def test_start_command_should_show_web_server_is_starting (self):
    expected = "web Server is available at //localhost:"

    self.assertIn(expected, self.timeExpOut)

if __name__ == '__main__':
    unittest.main()