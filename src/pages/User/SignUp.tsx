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

import ISignUpUser from 'interfaces/User/ISignUpUser';

import MyButton from 'elements/Button/MyButton';

import { SignUpUser } from 'utils/UserUtil';

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
	mode: "create" | "edit"
}

interface IState{
	id: string,
	password: string,
	passwordConfirm: string,
	mail: string,
	mailAuth: string,
}

export default function SignUp(props: IProps) {
	const classes = useStyles();
	
	const [isEdit, setIsEdit] = React.useState(props.mode === "edit" ? true : false);
	const [isDisabled, setIsDisabled] = React.useState(isEdit);
	const [id, setId] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [passwordConfirm, setPasswordConfirm] = React.useState("");
	const [mail, setMail] = React.useState("");
	const [mailAuth, setMailAuth] = React.useState("");
	const [isAgree, setIsAgree] = React.useState(false);

	const [isSend, setIsSend] = React.useState(false);
	const [isAuth, setIsAuth] = React.useState(false);

	const _onEnterMail = (keyCode: number) => {
		if (keyCode == 13) {
			_onClickAuthSend();
		}
	}
	const _onClickAuthSend = () => {
		if (password !== passwordConfirm) {
			alert("비밀번호를 확인해주세요");
			return 0;
		}
		
		setIsSend(true);
	}
	
	const _onEnterMailAuth = (keyCode: number) => {
		if (keyCode == 13) {
			_onClickAuth();
		}
	}
	const _onClickAuth = () => {
		setIsAuth(true);
	}

	const _onClickSignUp = async () => {
		if (!isAgree) {
			alert("동의 후 진행가능합니다.");
			return 0;
		}

		const signUpUser: ISignUpUser = {
			id: id,
			password: password,
			mail: mail,
		};

		await SignUpUser(signUpUser);
	}

  return (
    <React.Fragment>
			<Container component="main" maxWidth="xs">
				<Typography 
					className={classes.title}
					component="h1" 
					variant="h5">
						{
							!isEdit &&
								"Sign Up"
						}
				</Typography>
					{
						!isSend &&
							<React.Fragment>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<TextField
											disabled={isDisabled}
											variant="outlined"
											required
											fullWidth
											size="small"
											id="id"
											name="id"
											label="User ID"
											autoComplete="id"
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
											value={passwordConfirm}
											onChange={(e) => (setPasswordConfirm(e.target.value))}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											variant="outlined"
											required
											fullWidth
											size="small"
											name="mail"
											label="Email Address"
											id="mail"
											value={mail}
											onChange={(e) => (setMail(e.target.value))}
											onKeyUp={(e) => _onEnterMail(e.keyCode)}
										/>
									</Grid>
									<Grid item xs={12}>
										<Button
											fullWidth
											variant="contained"
											color="primary"
											className={classes.textButton}
											onClick={_onClickAuthSend}>
												인증요청
										</Button>
									</Grid>
								</Grid>
							</React.Fragment>
					}
					{
						(isSend && !isAuth) &&
							<React.Fragment>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<TextField
											variant="outlined"
											required
											fullWidth
											size="small"
											name="mailAuth"
											label="Authentication Code"
											id="mailAuth"
											value={mailAuth}
											onChange={(e) => (setMailAuth(e.target.value))}
											onKeyUp={(e) => _onEnterMailAuth(e.keyCode)}
										/>
									</Grid>
									<Grid item xs={12}>
										<Button
											fullWidth
											variant="contained"
											color="primary"
											className={classes.textButton}
											onClick={_onClickAuth}>
												인증확인
										</Button>
									</Grid>
								</Grid>
							</React.Fragment>
					}
					{
						(isSend && isAuth) &&
							<React.Fragment>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										{
											(isAuth) &&
												<Grid item xs={12}>
													<Typography>
														인증방식 설명
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
											label="내용을 다 읽고 이해하였습니다."
										/>
									</Grid>
									<Grid 
										container 
										justify="flex-end"
										className={classes.signup}>
											<MyButton
												color="blue"
												text="SIGN UP"
												onClick={_onClickSignUp}/>
									</Grid>
								</Grid>
							</React.Fragment>
					}
			</Container>
    </React.Fragment>
  );
}