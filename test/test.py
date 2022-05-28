import unittest
import subprocess

class TestStringMethods(unittest.TestCase):
  def test_hugo_start(self):
    expected = True
    outcome = True

    try:
      subprocess.check_output(...)
    except subprocess.CalledProcessError as e:
      outcome = False

    self.assertEqual(outcome, expected)

if __name__ == '__main__':
    unittest.main()