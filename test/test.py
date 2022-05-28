import sys
import os.path
import subprocess
import unittest

class TestHugo(unittest.TestCase):
  def setUp(self):
    self.dirPath = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
    self.executable = "start.sh"
    self.proc = subprocess.Popen(["sh", os.path.join(self.dirPath, self.executable)], stdout=subprocess.PIPE)

  def test_hugo_start(self):
    # checks mac Montesery

    expected = True
    result = True

    # Run docker container and setup macOS

    try:

    except subprocess.CalledProcessError as e:
      result = False

    self.assertEqual(result, expected)

  def tearDown(self):
    self.proc.terminate()

if __name__ == '__main__':
    unittest.main()