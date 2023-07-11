import React from 'react'
// import axios from 'axios'

const ExcelOnline = () => {
  // const X = async () => {
  //   const getAccessToken = async (
  //     clientId: string,
  //     clientSecret: string,
  //     tenantId: string,
  //   ) => {
  //     try {
  //       const response = await axios.post(
  //         `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
  //         {
  //           client_id: clientId,
  //           client_secret: clientSecret,
  //           grant_type: 'client_credentials',
  //           scope: 'https://graph.microsoft.com/.default',
  //         },
  //       )

  //       return response.data.access_token
  //     } catch (error) {
  //       throw new Error('Failed to obtain access token')
  //     }
  //   }

  //   // Usage
  //   const clientId = 'YOUR_CLIENT_ID'
  //   const clientSecret = 'YOUR_CLIENT_SECRET'
  //   const tenantId = 'YOUR_TENANT_ID'

  //   const accessToken = await getAccessToken(clientId, clientSecret, tenantId)
  //   return accessToken
  // }

  // const Y = async () => {
  //   const readTableData = async (
  //     accessToken: Promise<any>,
  //     fileId: string,
  //     tableName: string,
  //   ) => {
  //     try {
  //       const response = await axios.get(
  //         `https://graph.microsoft.com/v1.0/drives/${fileId}/items/${fileId}/workbook/tables/${tableName}/rows`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         },
  //       )

  //       return response.data
  //     } catch (error) {
  //       throw new Error('Failed to read table data')
  //     }
  //   }

  //   const fileId = 'YOUR_FILE_ID'
  //   const tableName = 'YOUR_TABLE_NAME'
  //   const tableData = await readTableData(X(), fileId, tableName)
  // }

  return (
    <div>
      <span>excel</span>
    </div>
  )
}

export default ExcelOnline
