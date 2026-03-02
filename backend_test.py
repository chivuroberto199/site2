import requests
import sys
import json
from datetime import datetime

class SeismicWaveAPITester:
    def __init__(self, base_url="https://wave-simulator-1.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}" if not endpoint.startswith('http') else endpoint
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}{'...' if len(str(response_data)) > 200 else ''}")
                except:
                    print(f"   Response: {response.text[:200]}")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:500]}")

            return success, response.json() if response.headers.get('content-type', '').startswith('application/json') else response.text

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout")
            return False, {}
        except requests.exceptions.ConnectionError:
            print(f"❌ Failed - Connection error")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test("Root API", "GET", "api/", 200)

    def test_health_endpoint(self):
        """Test health check endpoint"""
        return self.run_test("Health Check", "GET", "api/health", 200)

    def test_quiz_submit(self):
        """Test quiz submission"""
        quiz_data = {
            "score": 8,
            "total": 10,
            "answers": [
                {"question": 0, "selected": 2, "correct": 2, "isCorrect": True},
                {"question": 1, "selected": 1, "correct": 1, "isCorrect": True},
                {"question": 2, "selected": 2, "correct": 2, "isCorrect": True},
                {"question": 3, "selected": 1, "correct": 1, "isCorrect": True}
            ]
        }
        success, response = self.run_test("Quiz Submit", "POST", "api/quiz/submit", 200, quiz_data)
        return success, response

    def test_quiz_scores(self):
        """Test getting quiz scores"""
        return self.run_test("Get Quiz Scores", "GET", "api/quiz/scores", 200)

    def test_status_create(self):
        """Test creating status check"""
        status_data = {
            "client_name": "test_client"
        }
        success, response = self.run_test("Create Status Check", "POST", "api/status", 200, status_data)
        return success, response

    def test_status_list(self):
        """Test getting status checks"""
        return self.run_test("Get Status Checks", "GET", "api/status", 200)

def main():
    """Run all backend API tests"""
    print("🔬 Starting Seismic Wave Backend API Tests")
    print("="*60)
    
    tester = SeismicWaveAPITester()
    
    # Test API endpoints
    tests = [
        tester.test_root_endpoint,
        tester.test_health_endpoint,
        tester.test_quiz_submit,
        tester.test_quiz_scores,
        tester.test_status_create,
        tester.test_status_list,
    ]
    
    for test_func in tests:
        try:
            test_func()
        except Exception as e:
            print(f"❌ Test failed with exception: {e}")
            tester.tests_run += 1

    # Print summary
    print("\n" + "="*60)
    print(f"📊 Backend API Tests Summary:")
    print(f"   Tests run: {tester.tests_run}")
    print(f"   Tests passed: {tester.tests_passed}")
    print(f"   Success rate: {(tester.tests_passed/tester.tests_run*100) if tester.tests_run > 0 else 0:.1f}%")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All backend API tests passed!")
        return 0
    else:
        print(f"⚠️  {tester.tests_run - tester.tests_passed} test(s) failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())