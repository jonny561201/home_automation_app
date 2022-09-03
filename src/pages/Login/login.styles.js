.column {
    text-align: center;
    margin-bottom: 1rem;
}

.login-menu {
    border-radius: 10px;
    background-color: var(--primary-color);
    min-height: 550px;
    min-width: 350px;
}

@media (max-width: 479px) {
    .login-menu {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        position: absolute;
        border-radius: 0 !important;
    }

    .login-header {
        border-radius: 0 !important;
    }

    .login-body {
        margin-top: 5rem !important;
    }
}

.login-header {
    padding: 1rem;
    flex-grow: 1;
    border-radius: 10px 10px 0px 0px;
    background-color: #00c774;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: height 0.5s ease-in;
    height: 10rem;
}

h1 {
    margin-top: 0.67em;
    margin-bottom: 0;
}

.login-body {
    flex-grow: 10;
    border-radius: 0px 0px 12px 12px;
    background-color: var(--primary-color);
    margin-top: 2em;
}