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
    return new Node(this.page.$('[aria-label="New task label"]'));
  }

  get addTaskButton() {
    return new Node(this.page.$('button[type="submit"]'));
  }

  get tasks() {
    return this.page.$$eval('.task', nodes => nodes.map(n => n.textContent));
  }
}

class Node {
  constructor(elementHandle) {
    this.el = elementHandle;
  }

  async fill(value) {
    return (await this.el).fill(value);
  }

  async click() {
    return (await this.el).click();
  }

  get text() {
    return (async () =>
      (await this.el).evaluate(el => el.textContent)
    )();
  }

  get value() {
    return (async () =>
      (await this.el).evaluate(el => el.value)
    )();
  }
}

describe('Add task', () => {
  test('Add task', async () => (
    openBrowser(async (p) => {
      await p.newTaskLabelInput.fill('buy tomatoes');
      await p.addTaskButton.click();
      expect(await p.tasks).toEqual(['buy tomatoes']);

      // input should be cleared.
      expect(await p.newTaskLabelInput.value).toEqual('');
    })
  ));

  test('Skip if label is empty', async () => (
    openBrowser(async (p) => {
      await p.addTaskButton.click();
      expect((await p.tasks).length).toBe(0);
    })
  ));
});
