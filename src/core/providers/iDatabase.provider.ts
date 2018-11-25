interface IDatabaseProvider {
    createDatabase():any;
    readonly dbType: string;
}

export default IDatabaseProvider;