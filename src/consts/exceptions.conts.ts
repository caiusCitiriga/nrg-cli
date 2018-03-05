export const NRG_EXCEPTIONS = {
    NotAEnergyProjectException: {
        name: 'NotAEnergyProjectException',
        message: () => {
            return `This is not a valid EnergyCLI project. Run nrg init to create a CLI conf file.`;
        }
    }
}