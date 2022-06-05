.device-menu {
    margin: 0.5rem;
    background-color: var(--primary-color);
    border-radius: 10px;
    width: 400px;
    position: absolute;
    z-index: 10;
    top: 50%;
    right: 15%;
    box-shadow: 0px 0px 1px 5000px rgba(0,0,0,0.7);
    /* box-shadow: 0px 10px 15px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12); */
}

@media (max-width: 479px) {
    .device-menu {
        width: 300px;
        right: 10%;
    }
}

.device-text {
    margin-left: 1rem;
}

.close-icon {
    cursor: pointer;
    color: grey;
    align-self: center;
    margin: 1rem;
}

.device-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}