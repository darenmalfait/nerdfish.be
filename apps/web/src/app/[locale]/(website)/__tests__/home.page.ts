import AxeBuilder from '@axe-core/playwright'
import { type Page } from '@playwright/test'
import { BaseComponent, BasePage } from 'playwright/utils/page-object'
import { A11Y_TAGS, AXE_DISABLED_RULES } from './home.builders'

class ThemeSwitcherComponent extends BaseComponent {
	getLightThemeOption = () =>
		this.root.getByRole('radio', { name: 'Switch to Light theme' })
	getDarkThemeOption = () =>
		this.root.getByRole('radio', { name: 'Switch to Dark theme' })

	private async selectTheme(
		option: ReturnType<ThemeSwitcherComponent['getLightThemeOption']>,
	) {
		await option.waitFor({ state: 'visible' })

		if ((await option.getAttribute('aria-checked')) !== 'true') {
			await option.click()
		}
	}

	async selectLightTheme() {
		await this.selectTheme(this.getLightThemeOption())
	}

	async selectDarkTheme() {
		await this.selectTheme(this.getDarkThemeOption())
	}
}

class MobileNavigationComponent extends BaseComponent {
	getDrawer = () => this.root.page().getByRole('dialog')

	getNavLink = (name: string) =>
		this.getDrawer().getByRole('link', { name, exact: true })

	async openMenu() {
		await this.root.click()
		await this.getDrawer().waitFor({ state: 'visible' })
	}

	async clickNavLink(name: string) {
		await this.openMenu()
		await this.getNavLink(name).click()
	}

	async clickExpertiseLink(name: string) {
		await this.openMenu()
		await this.getNavLink(name).click()
	}
}

class MainNavigationComponent extends BaseComponent {
	getNavLink = (name: string) =>
		this.root.getByRole('link', { name, exact: true })

	getExpertiseTrigger = () =>
		this.root.getByRole('button', { name: 'Expertise' })

	getSubMenuPanel = () =>
		this.root.page().locator('[data-slot="navigation-menu-content"]')

	getExpertiseLink = (name: string) =>
		this.getSubMenuPanel().getByRole('link', { name })

	async openExpertiseMenu() {
		await this.getExpertiseTrigger().click()
		await this.getSubMenuPanel().waitFor({ state: 'visible' })
	}

	async clickNavLink(name: string) {
		await this.getNavLink(name).click()
	}

	async clickExpertiseLink(name: string) {
		await this.getExpertiseLink(name).click()
	}
}

export class HomePage extends BasePage {
	readonly themeSwitcher: ThemeSwitcherComponent
	readonly navigation: {
		main: MainNavigationComponent
		mobile: MobileNavigationComponent
	}

	constructor(page: Page) {
		super(page)
		this.themeSwitcher = new ThemeSwitcherComponent(
			page.getByRole('radiogroup', { name: 'Change site color theme' }).first(),
		)
		this.navigation = {
			main: new MainNavigationComponent(
				page.getByRole('navigation', { name: 'main' }),
			),
			mobile: new MobileNavigationComponent(
				page.getByRole('button', { name: 'Open navigation menu' }),
			),
		}
	}

	getHtml = () => this.page.locator('html')
	getHeroHeading = () =>
		this.page.getByRole('heading', {
			level: 1,
			name: 'Crafting Digital Experiences That Matter',
		})

	async goto() {
		await this.page.goto('/')
	}

	async getA11yViolations() {
		const a11yScanResults = await new AxeBuilder({ page: this.page })
			.withTags([...A11Y_TAGS])
			.disableRules([...AXE_DISABLED_RULES])
			.analyze()

		return a11yScanResults.violations
	}
}
