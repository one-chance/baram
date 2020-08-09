export default interface IMenu {
	idx: number,
	key: string,
	title: string,
	url: string,
	sub: Array<IMenu>
}