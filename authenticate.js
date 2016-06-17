var webdriver = require('selenium-webdriver');
var By = webdriver.By;
var until = webdriver.until;

module.exports = function authenticate(user, pass, cb) {
	var driver = new webdriver.Builder().forBrowser('firefox').build();
	driver.get('https://facebook.com/login.php');
	driver.findElement(By.id('email')).sendKeys(user);
	driver.findElement(By.id('pass')).sendKeys(pass);
	driver.findElement(By.id('pass')).sendKeys(webdriver.Key.RETURN);
	driver.wait(until.titleIs('Facebook')).then(() => {
		cb(null, {
			kill: () => driver.quit()
		});
	});
}
