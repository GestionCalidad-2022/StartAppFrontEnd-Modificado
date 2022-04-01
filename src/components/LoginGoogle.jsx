import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import fb from "../initializers";
import AxiosClient from "./AxiosClient";
import Avatar from '@material-ui/core/Avatar';

const URL_AUTH = process.env.REACT_APP_API_AUTH
const URL = process.env.REACT_APP_API
var telefonoContacto = null;
const onSubmit = async (values) => {
  telefonoContacto = values.user.phoneNumber;
  const bodyAuth = {
    email: values.additionalUserInfo.profile.email,
    tipo: "google",
    idGoogle: values.additionalUserInfo.profile.id,
  }
  AxiosClient.post(`${URL_AUTH}api/auth/signup`, bodyAuth)
    .then((response) => {
      if (response.status === 200) {
        const id_auth = response.data.id_autenticacion
        const body = {
          nombre: values.additionalUserInfo.profile.given_name,
          apellido: values.additionalUserInfo.profile.family_name,
          foto_url: values.user.photoURL,
          telefono: telefonoContacto,
          id_autenticacion: parseInt(id_auth),
        }
        AxiosClient.post(`${URL}extended_form`, body)
          .then((response) => {
            if (response.status === 201) {
              sessionStorage.setItem("jwt", values.credential.accessToken);
              sessionStorage.setItem("id", id_auth);
              window.location.href = `/`;
            }
          })
          .catch((response) => {
            console.log(response)
          })
      }
    }) 
    .catch((response) => {
      const body = {
        email: bodyAuth.email,
        tipo: "google",
        idGoogle: values.additionalUserInfo.profile.id,
      };
      AxiosClient.post(`${URL_AUTH}api/auth/signin`, body)
      .then((response) => {
        if ((response.status = 201)) {
          const jwt = response.data.accessToken;
          const id_auth = response.data.id;
          sessionStorage.setItem("jwt", jwt);
          sessionStorage.setItem("id", id_auth);
          window.location.href = `/`;
        }
      })
      .catch((response) => {
        console.log(response)
      });
    })
}

export default class LoginGoogle extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }
  
  login() {
    let provider = new fb.auth.GoogleAuthProvider();
    fb.auth()
      .signInWithPopup(provider)
      .then((result) => {
        onSubmit(result);
      });
  }

  render() {
    const name = this.props.name;
    return (
      <div>
        <Button variant="contained" onClick={this.login} >
          <Avatar 
            alt="Imagen de Google"
            src={"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIzOHB4IiBoZWlnaHQ9IjM4cHgiIHZpZXdCb3g9IjAgMCAzOCAzOCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5BcnRib2FyZDwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZyBpZD0iQXJ0Ym9hcmQiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPiAgICAgICAgPGcgaWQ9ImJ0bl9nb29nbGVfZGFya19ub3JtYWxfaW9zIj4gICAgICAgICAgICA8ZyBpZD0iYnV0dG9uLWJnLWNvcHkiPiAgICAgICAgICAgICAgICA8cmVjdCBpZD0icGF0aC0zIiB4PSIwIiB5PSIwIiB3aWR0aD0iMzgiIGhlaWdodD0iMzgiIHJ4PSIxIj48L3JlY3Q+ICAgICAgICAgICAgPC9nPiAgICAgICAgICAgIDxnIGlkPSJsb2dvX2dvb2dsZWdfNDhkcCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAuMDAwMDAwLCAxMC4wMDAwMDApIj4gICAgICAgICAgICAgICAgPHBhdGggZD0iTTE3LjY0LDkuMjA0NTQ1NDUgQzE3LjY0LDguNTY2MzYzNjQgMTcuNTgyNzI3Myw3Ljk1MjcyNzI3IDE3LjQ3NjM2MzYsNy4zNjM2MzYzNiBMOSw3LjM2MzYzNjM2IEw5LDEwLjg0NSBMMTMuODQzNjM2NCwxMC44NDUgQzEzLjYzNSwxMS45NyAxMy4wMDA5MDkxLDEyLjkyMzE4MTggMTIuMDQ3NzI3MywxMy41NjEzNjM2IEwxMi4wNDc3MjczLDE1LjgxOTU0NTUgTDE0Ljk1NjM2MzYsMTUuODE5NTQ1NSBDMTYuNjU4MTgxOCwxNC4yNTI3MjczIDE3LjY0LDExLjk0NTQ1NDUgMTcuNjQsOS4yMDQ1NDU0NSBaIiBpZD0iU2hhcGUiIGZpbGw9IiM0Mjg1RjQiPjwvcGF0aD4gICAgICAgICAgICAgICAgPHBhdGggZD0iTTksMTggQzExLjQzLDE4IDEzLjQ2NzI3MjcsMTcuMTk0MDkwOSAxNC45NTYzNjM2LDE1LjgxOTU0NTUgTDEyLjA0NzcyNzMsMTMuNTYxMzYzNiBDMTEuMjQxODE4MiwxNC4xMDEzNjM2IDEwLjIxMDkwOTEsMTQuNDIwNDU0NSA5LDE0LjQyMDQ1NDUgQzYuNjU1OTA5MDksMTQuNDIwNDU0NSA0LjY3MTgxODE4LDEyLjgzNzI3MjcgMy45NjQwOTA5MSwxMC43MSBMMC45NTcyNzI3MjcsMTAuNzEgTDAuOTU3MjcyNzI3LDEzLjA0MTgxODIgQzIuNDM4MTgxODIsMTUuOTgzMTgxOCA1LjQ4MTgxODE4LDE4IDksMTggWiIgaWQ9IlNoYXBlIiBmaWxsPSIjMzRBODUzIj48L3BhdGg+ICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zLjk2NDA5MDkxLDEwLjcxIEMzLjc4NDA5MDkxLDEwLjE3IDMuNjgxODE4MTgsOS41OTMxODE4MiAzLjY4MTgxODE4LDkgQzMuNjgxODE4MTgsOC40MDY4MTgxOCAzLjc4NDA5MDkxLDcuODMgMy45NjQwOTA5MSw3LjI5IEwzLjk2NDA5MDkxLDQuOTU4MTgxODIgTDAuOTU3MjcyNzI3LDQuOTU4MTgxODIgQzAuMzQ3NzI3MjczLDYuMTczMTgxODIgMCw3LjU0NzcyNzI3IDAsOSBDMCwxMC40NTIyNzI3IDAuMzQ3NzI3MjczLDExLjgyNjgxODIgMC45NTcyNzI3MjcsMTMuMDQxODE4MiBMMy45NjQwOTA5MSwxMC43MSBaIiBpZD0iU2hhcGUiIGZpbGw9IiNGQkJDMDUiPjwvcGF0aD4gICAgICAgICAgICAgICAgPHBhdGggZD0iTTksMy41Nzk1NDU0NSBDMTAuMzIxMzYzNiwzLjU3OTU0NTQ1IDExLjUwNzcyNzMsNC4wMzM2MzYzNiAxMi40NDA0NTQ1LDQuOTI1NDU0NTUgTDE1LjAyMTgxODIsMi4zNDQwOTA5MSBDMTMuNDYzMTgxOCwwLjg5MTgxODE4MiAxMS40MjU5MDkxLDAgOSwwIEM1LjQ4MTgxODE4LDAgMi40MzgxODE4MiwyLjAxNjgxODE4IDAuOTU3MjcyNzI3LDQuOTU4MTgxODIgTDMuOTY0MDkwOTEsNy4yOSBDNC42NzE4MTgxOCw1LjE2MjcyNzI3IDYuNjU1OTA5MDksMy41Nzk1NDU0NSA5LDMuNTc5NTQ1NDUgWiIgaWQ9IlNoYXBlIiBmaWxsPSIjRUE0MzM1Ij48L3BhdGg+ICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJTaGFwZSIgcG9pbnRzPSIwIDAgMTggMCAxOCAxOCAwIDE4Ij48L3BvbHlnb24+ICAgICAgICAgICAgPC9nPiAgICAgICAgPC9nPiAgICA8L2c+PC9zdmc+"}
            style={{width:"38", heigh:"36"}}
            />
          {name}
        </Button>
      </div>
    );
  }
}
