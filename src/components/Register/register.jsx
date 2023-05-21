import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { EMAIL_REGEXP, PASSWORD_REGEXP, VALIDATE_CONFIG, GROUP_REGEXP } from "../../utils/contants"
import Form from "../Form/form"
import { FormButton } from "../FormButton/form-button"
import { FormInput } from "../FormInput/form-input"
import { useDispatch } from "react-redux"
import { userRegister } from "../../storage/user/userSlice";

export const Register = () => {
   const location = useLocation();
   const initialPath = location.state?.initialPath;
   const dispatch = useDispatch();
   const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" })
   const navigate = useNavigate()
   const handleClickLoginButton = (e) => {
      e.preventDefault();
      navigate('/login', { replace: true, state: { backgroundLocation: location, initialPath } });
   }
   const sendRegisterApi = (data) => {
      console.log(data);
      dispatch(userRegister(data))
   }

   const emailRegister = register('email', {
      required: {
         value: true,
         message: VALIDATE_CONFIG.requiredMessage
      },
      pattern: {
         value: EMAIL_REGEXP,
         message: VALIDATE_CONFIG.emailMessage
      }
   })

   const passwordRegister = register('password', {
      required: {
         value: true,
         message: VALIDATE_CONFIG.requiredMessage
      },
      pattern: {
         value: PASSWORD_REGEXP,
         message: VALIDATE_CONFIG.passwordMesssage
      }
   })

   const groupRegister = register('group', {
      required: {
         value: true,
         message: VALIDATE_CONFIG.requiredMessage
      },
      pattern: {
         value: GROUP_REGEXP,
         message: VALIDATE_CONFIG.groupMesssage
      }
   })

   return (
      <Form title="Регистрация" handleFormSubmit={handleSubmit(sendRegisterApi)}>
         <FormInput
            {...emailRegister}
            id="email"
            type="text"
            placeholder="email"
         />
         {errors?.email && <p className='errorMessage'>{errors?.email?.message}</p>}
         <FormInput
            {...passwordRegister}
            id="password"
            type="password"
            placeholder="Пароль"
         />
         {errors?.password && <p className='errorMessage'>{errors?.password?.message}</p>}
         <FormInput
            {...groupRegister}
            id="group"
            type="text"
            placeholder="id группы в формате group-7"
         />
         {errors?.group && <p className='errorMessage'>{errors?.group?.message}</p>}

         <p className="infoText">Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой конфиденциальности и соглашаетесь на информационную рассылку.</p>
         <FormButton type="submit" color="yellow">Зарегистрироваться</FormButton>
         <FormButton color="white" type="button" onClick={handleClickLoginButton}>Войти</FormButton>
      </Form>
   )
}