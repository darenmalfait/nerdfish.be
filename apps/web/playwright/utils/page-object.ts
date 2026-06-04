import { type Locator, type Page } from '@playwright/test'

/** Contract for Playwright page objects used in e2e tests. */
export interface PageObject {
	readonly page: Page
	goto(path?: string): Promise<void>
}

/** Base class for page objects. Subclasses must implement {@link PageObject.goto}. */
export abstract class BasePage implements PageObject {
	constructor(public readonly page: Page) {}

	abstract goto(path?: string): Promise<void>
}

/** Contract for Playwright page components used in e2e tests. */
export interface PageComponent {
	readonly root: Locator
}

/** Base class for page components. Subclasses must implement {@link PageComponent.root}. */
export abstract class BaseComponent implements PageComponent {
	constructor(public readonly root: Locator) {}
}
