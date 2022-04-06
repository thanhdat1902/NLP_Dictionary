import styled from 'styled-components';

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #003;
    font-size: 20px;
    padding: 30px;
    a {
        text-decoration: none;
        color: #ffffff;
    }
    ul {
        list-style: none;
        li {
            display: inline-block;
            a {
                padding: 8px;
                margin-right: 10px;
                transition: all .5s;
            }
            a:link {
                border-style: none;
            }
            a:visted {
                border-style: solid;
                border-color: #ffffff;
            }
            a:hover {
                background-color: #ffffff;
                color: #0f223d;
            }
        }
    }
`


