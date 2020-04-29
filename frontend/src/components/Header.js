import React from 'react';

export default function Header({ title } = props) {
	return (
		<header>
			<h1>{ title }</h1>
		</header>
	);
}
