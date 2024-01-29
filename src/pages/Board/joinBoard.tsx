import AuthContext from '@/contexts/AuthContext';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BaseURL } from '../baseURL';

function JoinBoard() {
  const Navigate = useNavigate();
  const pathName = window.location.pathname;
  let authTokens = useContext(AuthContext)?.authTokens;
  useEffectOnce(() => {
    gettoken();
  });

  let gettoken = async () => {
    let response = await fetch(BaseURL + 'tascrum' + pathName, {
      method: 'GET',
      headers: {
        Authorization: `JWT ` + authTokens.access,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.status === 'Member added to the board') {
      //setflag(true);
      //swal("success!", "email verified", "success");
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Successfully joined',
        showConfirmButton: false,
        timer: 2000,
      });
      Navigate('/');
    } else if (data.status === 'Member already in board') {
      //seterr(data.error);
      //swal("Error!", data.error, "error");
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Member already in board',
        showConfirmButton: false,
        timer: 2000,
      });
      Navigate('/');
    } else {
      //seterr(data.error);
      //swal("Error!", data.error, "error");
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Link is wrong',
        showConfirmButton: false,
        timer: 2000,
      });
      Navigate('/');
    }
  };
  // const visibleTodos = useMemo(() => gettoken(), []);
  return <div>Loading</div>;
}

export default JoinBoard;

export const useEffectOnce = (effect: any) => {
  const destroyFunc = useRef<any>();
  const effectCalled = useRef(false);
  const renderAfterCalled = useRef(false);
  const [val, setVal] = useState(0);

  if (effectCalled.current) {
    renderAfterCalled.current = true;
  }

  useEffect(() => {
    if (!effectCalled.current) {
      destroyFunc.current = effect();
      effectCalled.current = true;
    }
    setVal((val) => val + 1);

    return () => {
      if (!renderAfterCalled.current) {
        return;
      }
      if (destroyFunc.current) {
        destroyFunc.current();
      }
    };
  }, []);
};
