/* eslint-disable react/prop-types */
import emojipedia from './emojipedia';
import Entry from './components/Entry';

function App() {
	return (
		<>
			<div>
				<h1>emojipedia</h1>
				<dl className="dictionary">
					{emojipedia.map(props => {
						<Entry key={props.id} {...props} />;
					})}
				</dl>
			</div>
		</>
	);
}

export default App;
