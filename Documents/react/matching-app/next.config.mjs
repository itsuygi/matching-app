/** @type {import('next').NextConfig} */
const nextConfig = {images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uploads.hoop.photo',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
    
    disableStaticImages: true,
    
  },
  env: {
    ACCESS_TOKEN: "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjMzMDUxMThiZTBmNTZkYzA4NGE0NmExN2RiNzU1NjVkNzY4YmE2ZmUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaG9vcC1wcm9kIiwiYXVkIjoiaG9vcC1wcm9kIiwiYXV0aF90aW1lIjoxNzEzMjczMzE1LCJ1c2VyX2lkIjoiVFh5QUdlRzdmUlZFZ1pIMHlxUTZrM0NpNGNkMiIsInN1YiI6IlRYeUFHZUc3ZlJWRWdaSDB5cVE2azNDaTRjZDIiLCJpYXQiOjE3MTgxMTYwNjgsImV4cCI6MTcxODExOTY2OCwiZW1haWwiOiI2eWdqem5weGhjQHByaXZhdGVyZWxheS5hcHBsZWlkLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImFwcGxlLmNvbSI6WyIwMDA3OTguNWVkY2U4MDdkNmYwNDM2OTk4ZjQ5YmJkZWQ2N2RkNzQuMTMxNSJdLCJlbWFpbCI6WyI2eWdqem5weGhjQHByaXZhdGVyZWxheS5hcHBsZWlkLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6ImFwcGxlLmNvbSJ9fQ.rlQu17IJ6CWJnFXImHGjXM61K8YNtGskkxhdvwmPapEB03cwWgc-yQzUplAcsxVDsG7zfDgcER58bKV3fXiX98L95f6Hr15_dAzxE8AVbq2nTdP_eD8yu6oKW4jsjhQRSKH0k8xKj7tDw_77kqXz4bragY3jEdnlVra5c0P6Ui0RyxyqnqdrAJn0_NCnnfbHOcw3Xkzi-S-MjzHnOA2Ywy3a_crN7uk40xcpvgKyVIbEs1dbRind_0MdqYDnaminY0Mz_A_HpHzhnEL3hHm5EVk7Q2JDQhKw4mynWkwlwNUvtGND9OqGMHS3hCOBkCp6peOBSHXlMduCpJbWlcU0GQ"
  }
};

export default nextConfig;
