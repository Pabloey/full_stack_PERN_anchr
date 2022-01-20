import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import About from './pages/About';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import './App.css';
import Nav from './component/Nav';
import UserHome from './pages/UserHome';
import History from './pages/History';
import { CheckSession } from './services/Auth';
import Summary from './pages/Summary';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './component/GlobalStyles';
import { lightTheme, darkTheme } from './component/Themes';

export default function App() {
	const [user, setUser] = useState(null);
	const [auth, setAuth] = useState(false);

	const [theme, setTheme] = useState('light');
	const themeToggler = () => {
		theme === 'light' ? setTheme('dark') : setTheme('light');
	};

	const checkToken = async () => {
		const user = await CheckSession();
		setUser(user);
		setAuth(true);
	};

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			checkToken();
		}
	}, []);

	return (
		<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
			<>
				<GlobalStyles />
				<div className='App'>
					{auth ? (
						<>
							<Nav setAuth={setAuth} setUser={setUser} />
							<main>
								<Route
									exact
									path='/'
									component={(props) => (
										<UserHome user_id={user.id} user={user} />
									)}
								/>
								<Route
									exact
									path='/history'
									component={(props) => <History user={user} />}
								/>
								<Route exact path='/about' component={About} />
								<Route exacth path='/summary' component={Summary} user={user} />
							</main>
						</>
					) : (
						<>
							<Route exact path='/signup' component={SignUp} />
							<Route
								exact
								path='/'
								component={(props) => (
									<LogIn {...props} setUser={setUser} setAuth={setAuth} />
								)}
							/>
						</>
					)}
				</div>
			</>
		</ThemeProvider>
	);
}
