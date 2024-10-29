# Automação de Testes End-to-End Playwright

## 🚀 INTRODUÇÃO:

O projeto de automação de testes end-to-end utilizando o framework Playwright, visa fornecer uma estrutura robusta para automatizar testes em aplicações web, com foco na eficiência e na integração contínua e entrega contínua (CI/CD) através da Pipeline do Github. Utilizando as tecnologias mais recentes, juntamente com as melhores práticas de desenvolvimento, este projeto oferece uma solução completa para garantir a qualidade do software em cada etapa do ciclo de desenvolvimento. Como base para os testes, utilizamos a plataforma [Automation Exercise](https://www.automationexercise.com/) como template, proporcionando um cenário realista para os casos de teste.
Além disso, como parte do compromisso com a qualidade do código e a consistência no desenvolvimento, implementamos o ESLint e o Prettier, com o objetivo de manter um código limpo, legível e livre de erros, contribuindo para a qualidade geral do projeto.

## 💻 TECNOLOGIAS:

- VS Code
- Node.js
- Java 11
- Playwright
- JavaScript
- Github Action

## 🤖 CONFIGURAÇÕES:

- Clonar o projeto na máquina local
- Executar no terminal do diretório do projeto o comando:

```
'npm install'
```

- Executar todos os testes:

```
npm run regression
```

- Executar o teste através de tag:

```
npm run tag '@nome_tag'
```

## 📂 ESTRUTURA DO PROJETO:

| Diretório       | Finalidade                                                                             |
| --------------- | -------------------------------------------------------------------------------------- |
| ./husky         | Configuração da automação dos commits                                                  |
| ./fixtures      | Massa de teste                                                                         |
| ./helpers       | Configuração com Hooks, Logger e outras funções utilizadas na automação                |
| ./resource/data | Credenciais para logar na aplicação                                                    |
| ./tests         | Testes E2E e pages concernentes aos testes automatizados                               |


## CONCLUSÃO:

Ao longo deste projeto, alcançamos diversos objetivos essenciais, desde a construção de testes automatizados até a implementação de uma pipeline de CI/CD eficiente. Utilizando as tecnologias mais recentes e modernas, conseguimos criar uma estrutura sólida e escalável para garantir a qualidade do software.