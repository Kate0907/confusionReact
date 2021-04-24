import React from 'react';
//arrow function, a loading spinner
export const Loading = () => {
	return (
		<div className="col=12">
			{/* a rotating spinner */}
			<span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary" />
			<p>Loading . . .</p>
		</div>
	);
};
