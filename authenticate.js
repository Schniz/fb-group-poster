var webdriver = require('selenium-webdriver');
var By = webdriver.By;
var until = webdriver.until;

module.exports = function authenticate(user, pass, data, cb) {
	var msg = data.msg;
	var groupId = data.groupId;
	var driver = new webdriver.Builder().forBrowser('firefox').build();

	driver.get('https://facebook.com/login.php');
	driver.findElement(By.id('email')).sendKeys(user);
	driver.findElement(By.id('pass')).sendKeys(pass);
	driver.findElement(By.id('pass')).sendKeys(webdriver.Key.RETURN);
	driver.wait(until.elementTextContains(driver.findElement(By.tagName('body')), 'Joe Hagever'));
	driver.get('https://www.facebook.com/groups/' + groupId);

	var textareaCss = '[data-testid=react-composer-root] textarea';
	driver.findElement(By.css(textareaCss)).click();

	var composerCss = '[data-testid=react-composer-root] [contenteditable]';
	var composer = () => driver.findElement(By.css(composerCss));
	composer().sendKeys(msg);
	composer().sendKeys(webdriver.Key.RETURN);

	driver.sleep(3000);

	driver.executeScript(() => {
		document.querySelector('[data-testid=react-composer-post-button]').click();
	}).then(() => {
		cb(null, {
			kill: () => driver.quit()
		});
	});
}
