import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import ISignUpUser from 'interfaces/Common/ISignUpUser';

import MyButton from 'elements/MyButton';

const useStyles = makeStyles((theme) => ({
	title: {
		marginTop: 10,
		textAlign: "center",
	},
	form: {
		marginTop: 20,
	},
	textButton: {
		alignItems: "center"
	},
	signup: {
		marginTop: 20,
	}
}));

interface IProps{
}

interface IState{
	id: string,
	password: string,
	passwordConfirm: string,
	mail: string,
	mailAuth: string,
}

export default function SignUp<IProps, IState>() {
	const classes = useStyles();
	
	const [id, setId] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [passwordConfirm, setPasswordConfirm] = React.useState("");
	const [mail, setMail] = React.useState("");
	const [mailAuth, setMailAuth] = React.useState("");
	const [isAgree, setIsAgree] = React.useState(false);

	const [isSend, setIsSend] = React.useState(false);
	const [isAuth, setIsAuth] = React.useState(false);

	const _onClickAuthSend = () => {
		if (password !== passwordConfirm) {
			alert("비밀번호를 확인해주세요");
			return 0;
		}

		setIsSend(true);
	}

	const _onClickAuth = () => {
		setIsAuth(true);
	}

	const _onClickSignUp = () => {
		if (!isAgree) {
			alert("동의 후 진행가능합니다.");
			return 0;
		}

		const signUp: ISignUpUser = {
			id: id,
			password: password,
			mail: mail,
		};

		console.log("SIGN UP USER INFO >>> " , signUp);

		clear();
	}

	const clear = () => {
		setId("");
		setPassword("");
		setPasswordConfirm("");
		setMail("");
		setMailAuth("");
		setIsAgree(false);
		
		setIsSend(false);
		setIsAuth(false);
	}

  return (
    <React.Fragment>
			<Container component="main" maxWidth="xs">
				<Typography 
					className={classes.title}
					component="h1" 
					variant="h5">
						Sign up
				</Typography>
				<form
					noValidate 
					className={classes.form}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								size="small"
								id="id"
								name="id"
								label="User ID"
								autoComplete="id"
								disabled={isSend}
								value={id}
								onChange={(e) => (setId(e.target.value))}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								size="small"
								name="password"
								label="Password"
								id="password"
								type="password"
								autoComplete="current-password"
								disabled={isSend}
								value={password}
								onChange={(e) => (setPassword(e.target.value))}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								error={((passwordConfirm !== "") && (password !== passwordConfirm))}
								helperText={(passwordConfirm !== "") && (password !== passwordConfirm) ? "비밀번호가 일치하지 않습니다." : ""}
								variant="outlined"
								required
								fullWidth
								size="small"
								name="passwordConfrim"
								label="password Confrim"
								id="passwordConfrim"
								type="password"
								disabled={isSend}
								value={passwordConfirm}
								onChange={(e) => (setPasswordConfirm(e.target.value))}
							/>
						</Grid>
						<Grid container item xs={12}>
							<Grid item xs={8}>
								<TextField
									variant="outlined"
									required
									fullWidth
									size="small"
									name="mail"
									label="Email Address"
									id="mail"
									disabled={isSend}
									value={mail}
									onChange={(e) => (setMail(e.target.value))}
								/>
							</Grid>
							<Grid item xs={4}>
								<Button
									fullWidth
									variant="contained"
									color="primary"
									className={classes.textButton}
									disabled={isSend}
									onClick={_onClickAuthSend}>
										인증요청
								</Button>
							</Grid>
						</Grid>
						<Grid container item xs={12}>
							<Grid item xs={8}>
								<TextField
									variant="outlined"
									required
									fullWidth
									size="small"
									name="mailauth"
									label="Authentication Code"
									id="mailauth"
									disabled = {!isSend || isAuth}
									value={mailAuth}
									onChange={(e) => (setMailAuth(e.target.value))}
								/>
							</Grid>
							<Grid item xs={4}>
								<Button
									fullWidth
									variant="contained"
									color="primary"
									className={classes.textButton}
									disabled = {!isSend || isAuth}
									onClick={_onClickAuth}>
										인증확인
								</Button>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							{
								(isAuth) &&
									<Grid item xs={12}>
										<Typography>
											인증되었습니다. 동의 후 회원가입을 진행하세요.
										</Typography>
									</Grid>
							}
							<FormControlLabel
								control={
									<Checkbox 
										value="allowExtraEmails" 
										color="primary" 
										checked={isAgree}
										onChange={(() => {setIsAgree(!isAgree)})}/>
								}
								label="닉네임 정회원 인증 후 설정 가능"
							/>
						</Grid>
					</Grid>
					<Grid 
						container 
						justify="flex-end"
						className={classes.signup}>
							<MyButton
								color="blue"
								text="SIGN UP"
								disabled={!isAuth}
								onClick={_onClickSignUp}/>
							{/*
							<Grid item>
								<Link href="/signin" variant="body2">
									로그인 하러가기
								</Link>
							</Grid>
							*/}
					</Grid>
				</form>
			</Container>
    </React.Fragment>
  );
}