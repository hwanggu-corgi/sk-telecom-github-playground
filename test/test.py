import sys
import os.path
import subprocess
import unittest

class TestHugo(unittest.TestCase):
  def setUp(self):
    self.dirPath = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
    self.executable = "start.sh"
    self.proc = subprocess.Popen(["sh", os.path.join(self.dirPath, self.executable)])

  def tearDown(self):
    # because sigkill is bad
    self.proc.terminate()

  def test_start_command_should_not_return_error(self):
    expected = True
    result = True

    try:
      subprocess.check_call(["sh", os.path.join(self.dirPath, self.executable)])
    except subprocess.CalledProcessError:
      result = False

    self.assertEqual(result, expected)

  def test_start_command_should_show_web_server_is_starting (self):
    for line in self.proc.stdout:
      print(line)
    pass

if __name__ == '__main__':
    unittest.main()