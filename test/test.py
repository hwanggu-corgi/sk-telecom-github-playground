import sys
import os.path
import subprocess
import unittest

class TestHugo(unittest.TestCase):
  def setUp(self):
    self.dirPath = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
    self.executable = "start.sh"

  def test_start_command_should_not_return_error(self):
    expected = True
    result = True

    try:
      subprocess.run(["sh", os.path.join(self.dirPath, self.executable)], timeout=10, capture_output=True, text=True)
    except subprocess.TimeoutExpired as timeErr:
      if timeErr.stderr is not None:
        result = False

    self.assertEqual(result, expected)

  def test_start_command_should_show_web_server_is_starting (self):
    expected = True
    result = False

    try:
      subprocess.run(["sh", os.path.join(self.dirPath, self.executable)], timeout=10, capture_output=True, text=True)
    except subprocess.TimeoutExpired as timeErr:
      print(timeErr.output.lower())
      if timeErr.output is not None and timeErr.output.lower().find("Web Server is available at //localhost:"):
        result = True

    self.assertEqual(result, expected)

if __name__ == '__main__':
    unittest.main()