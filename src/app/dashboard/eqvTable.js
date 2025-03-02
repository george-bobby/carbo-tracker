import React, { useState, useEffect } from 'react';
import { FaTree, FaMobileAlt, FaCar, FaGasPump, FaLeaf } from 'react-icons/fa';

const iconMapping = {
	'Smartphones Charged': <FaMobileAlt className='text-blue-400 text-xl' />,
	'Distance Driven': <FaCar className='text-gray-300 text-xl' />,
	'Trees Needed (1 Year)': <FaTree className='text-emerald-500 text-xl' />,
	'Gallons of Gasoline': <FaGasPump className='text-yellow-300 text-xl' />,
};

const EquivalenciesTable = ({ clerkId }) => {
	const [equivalencies, setEquivalencies] = useState(null);

	const fetchEquivalencies = async () => {
		try {
			const fetchedData = await fetch('/api/fetch').then((res) => res.json());
			const userData = fetchedData.find((item) => item.clerkId === clerkId);

			if (userData && userData.equivalencies) {
				setEquivalencies(userData.equivalencies);
			} else {
				console.error('No data found for the given clerkId or equivalencies');
			}
		} catch (error) {
			console.error('Error fetching equivalencies data:', error);
		}
	};

	useEffect(() => {
		if (clerkId) fetchEquivalencies();
	}, [clerkId]);

	if (!equivalencies) {
		return (
			<div className='flex flex-col items-center justify-center text-center py-12'>
				<div className='h-16 w-16 rounded-full bg-emerald-900/30 flex items-center justify-center mb-4'>
					<div className='h-8 w-8 text-emerald-400'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<path d='M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83'></path>
						</svg>
					</div>
				</div>
				<p className='text-gray-400 text-lg'>
					No data found. Add data in "Calculator" to show it on "Dashboard".
				</p>
			</div>
		);
	}

	return (
		<div className='flex flex-col'>
			<h2 className='text-xl font-bold mb-6 text-white flex items-center gap-2'>
				<div className='h-8 w-8 rounded-md bg-emerald-900/50 flex items-center justify-center text-emerald-400'>
					<FaLeaf />
				</div>
				Environmental Equivalencies
			</h2>
			<div className='overflow-x-auto'>
				<table className='w-full'>
					<thead>
						<tr>
							<th className='px-4 py-3 text-left text-sm font-medium text-emerald-400 border-b border-slate-700'></th>
							<th className='px-4 py-3 text-left text-sm font-medium text-emerald-400 border-b border-slate-700'>
								Category
							</th>
							<th className='px-4 py-3 text-left text-sm font-medium text-emerald-400 border-b border-slate-700'>
								Value
							</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-slate-700/50'>
						{Object.entries(equivalencies).map(([key, value]) => (
							<tr
								key={key}
								className='hover:bg-slate-700/30 transition-colors duration-150'
							>
								<td className='px-4 py-4 text-center'>
									<div className='flex items-center justify-center h-10 w-10 rounded-full bg-slate-700/50 mx-auto'>
										{iconMapping[key] || (
											<span className='text-gray-500'>N/A</span>
										)}
									</div>
								</td>
								<td className='px-4 py-4 text-white'>{key}</td>
								<td className='px-4 py-4 text-emerald-400 font-medium'>
									{value}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default EquivalenciesTable;
