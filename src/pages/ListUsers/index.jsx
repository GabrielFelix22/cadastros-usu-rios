import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

import Button from '../../components/Button'
import TopBackground from '../../components/TopBackground'
import Trash from '../../assets/trash.svg'

import {
    Container,
    ContainerUsers,
    CardUsers,
    TrashIcon,
    Title,
    AvatarUser,
} from './styles'

function ListUsers() {

    const navigate = useNavigate()
    const [users, setUsers] = useState([])

    useEffect(() => {

        async function getUsers() {
            const { data } = await api.get('/usuarios')

            setUsers(data)
        }
        getUsers()
    }, [])

    async function deleteUsers(id) {
        await api.delete(`/usuarios/${id}`)

        const upadatedUsers = users.filter(user => user.id !== id) 

        setUsers(upadatedUsers)
    }

    return (
        <Container>
            <TopBackground />
            <Title>Lista de Usuários</Title>

            <ContainerUsers>
                {users.map((user) => (
                    <CardUsers key={user.id}>
                        <AvatarUser src={`https://avatar.iran.liara.run/public?username=${user.id}`} />
                        <div>
                            <h3>Nome: {user.name}</h3>
                            <p>Idade: {user.age}</p>
                            <p>E-mail: {user.email}</p>
                        </div>
                        <TrashIcon src={Trash} alt='icone-lixo' onClick={() => deleteUsers(user.id)} />
                    </CardUsers>
                ))}
            </ContainerUsers>
            <Button type="button" onClick={() => navigate('/')}>
                Voltar
            </Button>
        </Container>
    )
}

export default ListUsers


// useEffect é uma função que é executada toda vez que um componente é renderizado ou quando uma variável de estado altera de valor
// TODA VEZ que a tela carrega, o useEffect é chamado
// TODA VEZ que uma determinada variável MUDA de valor, ele é chamdo