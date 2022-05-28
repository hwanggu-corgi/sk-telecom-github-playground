import unittest
import subprocess

class TestHugoUbuntu(unittest.TestCase):
  def setup(self):
    # Run docker container and setup Ubuntu (if not installed)
    pass

  def test_hugo_start_ubuntu(self):
    # checks Ubuntu 20

    pass

  def test_hugo_start_windows(self):
    # checks windows 11
    pass

class TestHugoWindows(unittest.TestCase):
  def setup(self):

    # Run docker container and setup Windows (if not installed)
    pass

  def test_hugo_start_windows(self):
    # checks mac Montesery

    expected = True
    outcome = True

    # Run docker container and setup macOS

    try:
      subprocess.check_output(...)
    except subprocess.CalledProcessError as e:
      outcome = False

    self.assertEqual(outcome, expected)

class TestHugoMacOs(unittest.TestCase):
  def setup(self):

    # Run docker container and setup MacOs (if not installed)
    pass

  def test_hugo_start_macos(self):
    # checks mac Montesery

    expected = True
    outcome = True

    # Run docker container and setup macOS

    try:
      subprocess.check_output(...)
    except subprocess.CalledProcessError as e:
      outcome = False

    self.assertEqual(outcome, expected)

if __name__ == '__main__':
    unittest.main()