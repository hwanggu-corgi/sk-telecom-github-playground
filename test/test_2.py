import sys
import os.path
import subprocess
import unittest

class TestHugo(unittest.TestCase):
  def setUp(self) -> None:
    self.dirPath = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
    self.executable = "start.sh"

    self.proc = subprocess.Popen(["sh", os.path.join(self.dirPath, self.executable)], stdout=subprocess.PIPE)
    for stdout_line in iter(self.proc.stdout.readline, ""):
        print(stdout_line)

    self.proc.kill()
    try:
      print("I am here")
      outs, errs = self.proc.communicate(timeout=1)
      print("--------success----")
      print(outs)
      print(errs)
    except subprocess.TimeoutExpired as e:
      print("I am here 2")
      outs, errs = self.proc.communicate()
      print("--------error----")
      print(outs)
      print(errs)


  def tearDown(self) -> None:
    self.proc.terminate()


  def test_start_command_should_show_web_server_is_starting (self) -> None:
    expected = True

    # result = self.timeExpOut.find( "web server is available at //localhost:") != -1
    # print(self.timeExpOut)
    # self.assertEqual(expected, result)

if __name__ == '__main__':
    unittest.main()