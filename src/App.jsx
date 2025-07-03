import { useLayoutEffect, useState } from 'react'
import IconButton from './components/IconButton.jsx'
import TopAppBar from './components/TopAppBar.jsx'
import { FaGithub } from 'react-icons/fa'
import { SongListSection } from './SongListSection.jsx'
import { NowPlayingSection } from './NowPlayingSection.jsx'
import { EntryDetailsDialog } from './EntryDetailsDialog.jsx'
import './App.scss'

function App() {
	const [searchQuery, setSearchQuery] = useState('');

	return (
		<>
			<TopAppBar
				rightButtons={
					<>
						<input
							type="text"
							className="song-search-input"
							placeholder="Search songs..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<a href="https://github.com/BakaTechie/scarlet-sounds" target="_blank" rel="noreferrer noopener" className="github-link">
							<IconButton>
								<FaGithub/>
							</IconButton>
						</a>
						<IconButton className="mobile-topbar-icon-placeholder"/>
					</>
				}
			>
				Scarlet Sounds
				{' '}
				<SongCount/>
			</TopAppBar>
			<div className="main">
				<SongListSection searchQuery={searchQuery} />
				<NowPlayingSection/>
			</div>
			<EntryDetailsDialog/>
		</>
	)
}

export default App

function SongCount() {
	const [count, setCount] = useState(window.songCount ?? -1);

	useLayoutEffect(() => {
		const updateCount = () => {
			const count = window.songCount ?? -1;
			setCount(count);
		}
		window.addEventListener('song-count-change', updateCount);
		updateCount();
		return () => {
			window.removeEventListener('song-count-change', updateCount);
		}
	}, []);


	return (
		count >= 0 && <span className='topbar-song-count'>{count} Songs</span>
	)
}
