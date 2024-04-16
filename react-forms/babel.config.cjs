module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],  // Transpile code to match the current Node version
        '@babel/preset-react'  // Transpile JSX
    ]
};

