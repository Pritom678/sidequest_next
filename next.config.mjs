/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = {
        child_process: "commonjs child_process",
        mongodb: "commonjs mongodb",
        bson: "commonjs bson",
        "mongodb-legacy": "commonjs mongodb-legacy",
        aws4: "commonjs aws4",
        "mongodb-client-encryption": "commonjs mongodb-client-encryption",
        kerberos: "commonjs kerberos",
        "mongodb-client-encryption": "commonjs mongodb-client-encryption",
        saslprep: "commonjs saslprep",
        "mongodb-client-side-encryption":
          "commonjs mongodb-client-side-encryption",
        mongocryptd_manager: "commonjs mongocryptd_manager",
        "mongodb-aws": "commonjs mongodb-aws",
        "mongodb-atlas-cloud-forms": "commonjs mongodb-atlas-cloud-forms",
      };
    }
    return config;
  },
  turbopack: {},
};

export default nextConfig;
