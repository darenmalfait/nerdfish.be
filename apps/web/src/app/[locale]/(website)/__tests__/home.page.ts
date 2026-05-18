import AxeBuilder from '@axe-core/playwright'
import { type Page } from '@playwright/test'
import { A11Y_TAGS, AXE_DISABLED_RULES } from './home.builders'

class ThemeSwitcherComponent {
	constructor(private readonly root: Page) {}

	getRadiogroup = () =>
		this.root
			.getByRole('radiogroup', { name: 'Change site color theme' })
			.first()
	getLightThemeOption = () =>
		this.getRadiogroup().getByRole('radio', { name: 'Switch to Light theme' })
	getDarkThemeOption = () =>
		this.getRadiogroup().getByRole('radio', { name: 'Switch to Dark theme' })

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

class MobileNavigationComponent {
	constructor(private readonly root: Page) {}

	getMenuTrigger = () =>
		this.root.getByRole('button', { name: 'Open navigation menu' })

	getDrawer = () => this.root.getByRole('dialog')

	getNavLink = (name: string) =>
		this.getDrawer().getByRole('link', { name, exact: true })

	async openMenu() {
		await this.getMenuTrigger().click()
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

class NavigationComponent {
	readonly mobile: MobileNavigationComponent

	constructor(private readonly root: Page) {
		this.mobile = new MobileNavigationComponent(root)
	}

	getMainNavigation = () => this.root.getByRole('navigation', { name: 'main' })

	getNavLink = (name: string) =>
		this.getMainNavigation().getByRole('link', { name, exact: true })

	getExpertiseTrigger = () =>
		this.getMainNavigation().getByRole('button', { name: 'Expertise' })

	getExpertiseLink = (name: string) =>
		this.root.getByRole('link', { name, exact: true })

	async openExpertiseMenu() {
		await this.getExpertiseTrigger().click()
	}

	async clickNavLink(name: string) {
		await this.getNavLink(name).click()
	}

	async clickExpertiseLink(name: string) {
		await this.getExpertiseLink(name).click()
	}
}

export class HomePage {
	readonly page: Page
	readonly themeSwitcher: ThemeSwitcherComponent
	readonly navigation: NavigationComponent

	constructor(page: Page) {
		this.page = page
		this.themeSwitcher = new ThemeSwitcherComponent(page)
		this.navigation = new NavigationComponent(page)
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
