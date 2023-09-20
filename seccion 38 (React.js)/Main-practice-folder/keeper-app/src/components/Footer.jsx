function Footer() {
	const year = new Date().getFullYear();

	const footer = (
		<footer>
			<p>Copyright {year} &copy;</p>
		</footer>
	);

	return footer;
}

export default Footer;
