const playwright = require('playwright');

const openBrowser = async (callback) => {
  const browser = await playwright['chromium'].launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:1234/');
  await callback(new TodoPage(page));
  await browser.close();
};

class TodoPage {
  constructor(page) {
    this.page = page;
  }

  get newTaskLabelInput() {
    return this.page.$('[aria-label="New task label"]');
  }

  get addTaskButton() {
    return this.page.$('button[type="submit"]');
  }

  get tasks() {
    return this.page.$$eval('.task', nodes => nodes.map(n => n.textContent));
  }
}

test('Add task', async () => {
  return openBrowser(async (p) => {
    await (await p.newTaskLabelInput).fill('buy tomatoes');
    await (await p.addTaskButton).click();
    expect(await p.tasks).toEqual(['buy tomatoes']);

    // input is cleared.
    expect(
      await(await p.newTaskLabelInput).evaluate(n => n.value)
    ).toEqual('');
  });
});
