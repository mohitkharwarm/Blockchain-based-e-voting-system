

module.exports = {
 

  networks: {
    
     development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
     }
    
  },
  // Set default mocha options here, use special reporters etc.
 contracts_directory :'./contracts/',
 contracts_build_directory :'./client/src/contracts',
solc:{
 optimizer: {
  enabled: true,
  runs: 200
 }},
  // Configure your compilers
  compilers: {
    solc: {
       version: "0.5.1",    
    }
  },
};
