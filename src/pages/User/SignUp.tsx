import React from 'react';
import {useSetRecoilState} from 'recoil';
import {MyAlertState, MyBackdropState} from 'state/index';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';

import MyButton from 'elements/Button/MyButton';

import { CheckExistUser, SignUpUser } from 'utils/UserUtil';

const useStyles = makeStyles({
	title: {
		marginTop: 10,
		textAlign: "center",
	},
	form: {
		marginTop: 20,
	},
	checkButton: {
		alignItems: "center"
	},
	signup: {
		marginTop: 20,
	}
});

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

const duration = 2000;

export default function SignUp(props: IProps) {
	const classes = useStyles();
	
	const setMyAlert = useSetRecoilState(MyAlertState);
	const setMyBackdrop = useSetRecoilState(MyBackdropState);
	
	const [id, setId] = React.useState("");
	const refId = React.useRef<any>();
	const [isNewId, setIsNewId] = React.useState(false);
	const [password, setPassword] = React.useState("");
	const [passwordConfirm, setPasswordConfirm] = React.useState("");
	const [isAgree, setIsAgree] = React.useState(false);

	const _onCheckExist = async () => {
		const res = await CheckExistUser(id);

		if (res.code === 200) {
			alert(res.message);
			setIsNewId(true);
		}
		else {
			alert(res.message);
			setIsNewId(false);
			refId.current.focus();
		}
	}

	const _onClickSignUp = async () => {
		if (!isNewId) {
			alert("ID 중복확인 후 진행 가능합니다.");
			refId.current.focus();
			return 0;
		}

		if (!isAgree) {
			alert("동의 후 진행 가능합니다.");
			return 0;
		}

		setMyBackdrop(true);
		const res = await SignUpUser(id, password);
		if (res.code === 200) {
      // Successed Authentication
      setMyAlert({
        isOpen: true,
        severity: "success",
        duration: duration,
        message: res.message
      });
      setTimeout(() => document.location.href = "/signin", duration);
    }
    else {
      // Failed Authentication
      setMyAlert({
        isOpen: true,
        severity: "error",
        duration: duration,
        message: res.message
      });

      setTimeout(() => setMyBackdrop(false), duration);
    }
	}

  return (
    <React.Fragment>
			<Container component="main" maxWidth="xs">
				<Typography 
					className={classes.title}
					component="h1" 
					variant="h5">
						Sign Up
				</Typography>
				<React.Fragment>
					<Grid container spacing={2}>
						<Grid container item xs={12} spacing={2}>
							<Grid item xs={9}>
								<TextField
									variant="outlined"
									autoFocus
									required
									fullWidth
									disabled={isNewId}
									size="small"
									id="id"
									name="id"
									label="User ID"
									inputRef={refId}
									value={id}
									onChange={(e) => (setId(e.target.value))}
								/>
							</Grid>
							<Grid item xs={3}>
								<Button
									variant="contained"
									color="primary"
									className={classes.checkButton}
									startIcon={<CheckIcon />}
									onClick={_onCheckExist}
								>
									{
										isNewId ? "완료" : "검사"
									}
								</Button>
							</Grid>
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
							<Grid item xs={12}>
								<Typography>
									인증방식 설명
								</Typography>
							</Grid>
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
			</Container>
    </React.Fragment>
  );
}