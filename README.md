# piano

## Installation

Pour installer les dépendances nécessaires, exécutez la commande suivante :
```bash
# cloner repo GitHub
cd ~/
git clone https://github.com/ouic/piano.git
cd ~/piano

# installer nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

# ajouter nvm à .bashrc
echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.bashrc
echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm' >> ~/.bashrc
echo '[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion' >> ~/.bashrc
source ~/.zshrc

# installre Node.js
nvm install 22

# redémarrer le terminal
source ~/.bashrc
```

## Utilisation

Pour démarrer le projet, utilisez la commande suivante :
```bash
cd ~/piano
npm install && npm run dev
```