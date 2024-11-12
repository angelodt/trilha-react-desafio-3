import { useNavigate  } from "react-router-dom";
import { MdPerson, MdEmail, MdLock } from 'react-icons/md';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';

import { useForm } from "react-hook-form";

import { Column, Container, Title,FazerLoginText,JaTenhoContaText,PolicyText,SubtitleCadastro,TitleCadastro, Wrapper, Row, LastRow } from "./styles"


const Cadastro = () => {

    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors  } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try{
            const {data} = await api.putForm(`/users?nome=${formData.nome}&email=${formData.email}&senha=${formData.senha}`);
            
            if(data.length && data[0].id){
                navigate('/feed') 
                return
            }

        }catch(e){
            //TODO: HOUVE UM ERRO
            alert('Erro de cadastro.')
        }
    };

    console.log('errors', errors);

  return (<>
    <Header />
    <Container>
        <Column>
            <Title>A plataforma para você aprender com experts, 
                dominar as principais tecnologias e entrar mais rápido
                 nas empresas mais desejadas.
            </Title>
        </Column>
        <Column>
            <Wrapper>
                <TitleCadastro>Comece agora grátis</TitleCadastro>
                <SubtitleCadastro>Crie sua conta e make the change._</SubtitleCadastro>
                <form onSubmit={handleSubmit(onSubmit)}>
                <Input placeholder="Nome completo" leftIcon={<MdPerson />} name="nome"  control={control} />
                {errors.email && <span>E-mail é obrigatório</span>}
                    <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email"  control={control} />
                    {errors.email && <span>E-mail é obrigatório</span>}
                    <Input type="password" placeholder="Password" leftIcon={<MdLock />}  name="senha" control={control} />
                    {errors.senha && <span>Senha é obrigatório</span>}
                    <Button title="Criar minha conta" variant="secondary" type="submit"/>
                </form>
                <Row>
                    <PolicyText>Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.</PolicyText>
                </Row>
                <LastRow>
                    <JaTenhoContaText>Já tenho conta.</JaTenhoContaText>
                    <FazerLoginText>Fazer login</FazerLoginText>
                </LastRow>
            </Wrapper>
        </Column>
    </Container>
  </>
  )
}

export { Cadastro }

