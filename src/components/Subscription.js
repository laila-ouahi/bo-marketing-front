import Table from "./UI/Table";
import React, { useEffect, useState } from "react";
import { useKeycloak } from '@react-keycloak/web';
import axios from "axios";
import moment from "moment";

const columns = [
  {
    title: 'E-mail',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Motif',
    dataIndex: 'motif',
    key: 'motif',
  },
  {
    title: 'Souscription',
    dataIndex: 'subscribed',
    key: 'subscribed',
  },
  {
    title: 'Date',
    dataIndex: 'dateModification',
    key: 'dateModification',
    render: (text, record) => <p>{moment(new Date(record.dateModification)).format('DD/MM/YYYY')}</p>
    
  }
];

const format = (subscriptions=[]) => {
  return subscriptions.map(item => ({...item,subscribed: item.subscribed?"oui":"non"}))
}

function Subscription() {
  const [contentFile, setContentFile] = useState([])

  const { keycloak, initialized } = useKeycloak()

  useEffect(() => {
    if (keycloak.authenticated) {
      console.log(keycloak)
      let token = keycloak.token
      var config = {
        method: 'get',
        url: process.env.REACT_APP_ENDPOINT + '/client/list',
        headers: {
          'Authorization': "Bearer " + token
        }
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          setContentFile(format(response.data))
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
    , [keycloak.authenticated])

  return (
    <div>
      <h1 style={{ fontSize: "3.3em", textAlign: "center",paddingTop:"30px" }}>
        Souscription des clients
      </h1>
        <h3 style={{textAlign: "center"}}>
        Le tableau ci-dessous présente l'état des souscriptions au service d'envoi des notifications mail Marketing
      </h3>
      
      <Table data={contentFile} columns={columns} />
    </div>
  )
}

export default Subscription