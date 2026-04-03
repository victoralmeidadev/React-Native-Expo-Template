# Template para Projetos React Native com Expo Dev Client

Este é um template otimizado para iniciar rapidamente projetos React Native utilizando o **Expo Dev Client**, já configurado com as principais ferramentas de desenvolvimento modernas para garantir qualidade de código, testes eficientes e produtividade.

## Tecnologias e Ferramentas Configuradas

- **[ESLint](https://eslint.org/)**: Para garantir a qualidade e consistência do código através de regras de linting.
- **[Prettier](https://prettier.io/)**: Formatação automática do código, mantendo padrões consistentes.
- **[Jest](https://jestjs.io/)**: Framework de testes JavaScript focado em simplicidade.
- **[React Native Testing Library](https://testing-library.com/docs/react-native-testing-library/intro)**: Utilitário para facilitar a criação de testes no React Native.
- **[React Navigation](https://reactnavigation.org/)**: Biblioteca de navegação para gerenciar rotas entre telas no React Native.
- **[Axios](https://axios-http.com/)**: Cliente HTTP baseado em Promises para realizar requisições API.
- **[Husky](https://typicode.github.io/husky/)**: Ferramenta para adicionar hooks Git, automatizando processos como lint e formatação antes de commits.
- **[lint-staged](https://github.com/okonet/lint-staged)**: Executa linters nos arquivos staged do Git, garantindo que apenas o código correto seja comitado.
- **[git-commit-msg-linter](https://github.com/legend80s/commit-msg-linter)**: Valida e impõe padrões de mensagens de commit para manter a consistência no histórico do Git.

## Como Utilizar

Siga os passos abaixo para criar um novo projeto utilizando este template:

```bash
npx create-expo-app my-app --template @victoralmeidadev/expo-template
```

Recomenda-se **Node.js** na faixa exigida pelo React Native/Expo do template (consulte o [changelog do Expo](https://github.com/expo/expo/blob/main/CHANGELOG.md) e [expo.dev/changelog](https://expo.dev/changelog) para versões atuais).

### EAS Build e Expo Dev Client

1. Instale a [EAS CLI](https://docs.expo.dev/eas/) (`npm i -g eas-cli`) e faça login: `eas login`.
2. No diretório do app: `eas init` e configure o projeto no [expo.dev](https://expo.dev) (variáveis de ambiente e credenciais de loja ficam no dashboard ou em arquivos locais conforme a documentação).
3. Para um binário de desenvolvimento com Dev Client: `eas build --profile development --platform android` (e/ou `ios`).

Os perfis de build estão em `eas.json` (`development`, `preview`, `production`). O canal do EAS Update usa o campo `channel` por perfil (sem `releaseChannel` legado).

Para mais detalhes sobre builds locais, TestFlight e fluxos de Dev Client, veja a documentação do projeto em `.agents/skills/expo-dev-client/SKILL.md` (se disponível no repositório clonado).
