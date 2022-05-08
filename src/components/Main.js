import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Checkbox, Col, Divider, Row } from "antd";
import { Drawer } from 'antd';
import Button from "../components/UI/Forms/Button";
import "../assets/css/slick.min.css"
import Table from "./UI/Table";
import Unfound from "./Unfound";
import { token } from "../Utils";
import Keycloak from "keycloak-js";
import { useKeycloak } from '@react-keycloak/web';
import Modale from "./UI/Modale";




const columns = [
  {
    title: 'Numero Tiers',
    dataIndex: 'numeroTiers',
    key: 'numeroTiers',
  },
  {
    title: 'E-Mail',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Objet',
    dataIndex: 'objet',
    key: 'objet',
  },
  {
    title: 'Lien Image',
    dataIndex: 'urlImage',
    key: 'urlImage',
    render: (text) => <p style={{ width: 200 }}>{text}</p>
  },
  {
    title: 'Lien',
    dataIndex: 'lien',
    key: 'lien',
    render: (text) => <p style={{ width: 200 }}>{text}</p>
  },
];

const formatData = (files) => {
  let newFiles = files.map(item => ({
    ...item, name: item.path.split('/').pop(),

  }))
  return newFiles
}


const Main = () => {

  const [showPreview, setShowPreview] = useState(false)

  const [loading, setLoading] = useState(false)

  const [visible, setVisible] = useState(false)

  const [toRefresh, setToRefresh] = useState(false)

  const [existingFiles, setExistingFiles] = useState([])

  const [sentFiles, setSentFiles] = useState([])

  const [errorFiles, setErrorFiles] = useState([])

  const [contentFile, setContentFile] = useState([])

  const { keycloak, initialized } = useKeycloak()

  useEffect(() => {
    check()
    checkSent()
    checkError()
  }
    , [keycloak.authenticated])

  const handlePreview = (path) => {
    fetchContent(path)
    setShowPreview(prevState => !prevState)
  }

  const onClose = () => {
    setShowPreview(false);
  };
  const columnsAvailableFiles = [
    {
      title: 'Nom du fichier',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Chemin',
      dataIndex: 'path',
      key: 'path',
      render: (text) => <p style={{ maxWidth: 'max-content', margin: 'auto', display: 'flex', flexWrap: 'wrap' }}>{text}</p>
    },
    {
      title: 'Date de création',
      dataIndex: 'dateCreation',
      key: 'dateCreation',
    },
    {
      title: 'Statut',
      dataIndex: 'statut',
      key: 'statut',
    },
    {
      title: 'Contenu',
      dataIndex: '',
      key: 'x',
      render: (text, record) => <Button onClick={() => handlePreview(record.path)}>Visualiser</Button>,
    }
  ];
  const columnsSentFiles = [
    {
      title: 'Nom du fichier',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Chemin',
      dataIndex: 'path',
      key: 'path',
      render: (text) => <p style={{ maxWidth: 'max-content', margin: 'auto', display: 'flex', flexWrap: 'wrap' }}>{text}</p>
    },
    {
      title: 'Date d\'envoi',
      dataIndex: 'dateEnvoi',
      key: 'dateEnvoi',
      sorter: (a, b) => new Date(b.dateEnvoi) - new Date(a.dateEnvoi),
      defaultSortOrder: 'defaultSortOrder',
    },
    {
      title: 'Statut',
      dataIndex: 'statut',
      key: 'statut',
    },
    {
      title: 'Contenu',
      dataIndex: '',
      key: 'x',
      render: (text, record) => <Button onClick={() => handlePreview(record.path)}>Visualiser</Button>,
    }
  ];

  const columnsErrorFiles = [
    {
      title: 'Nom du fichier',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Chemin',
      dataIndex: 'path',
      key: 'path',
      render: (text) => <p style={{ maxWidth: 'max-content', margin: 'auto', display: 'flex', flexWrap: 'wrap' }}>{text}</p>
    },
    {
      title: 'Statut',
      dataIndex: 'statut',
      key: 'statut',
    },
    {
      title: 'Motif',
      dataIndex: 'motif',
      key: 'motif',
    }
  ];
  const check = () => {
    if (keycloak.authenticated) {
      console.log(keycloak)
      let token = keycloak.token
      var config = {
        method: 'get',
        url: process.env.REACT_APP_ENDPOINT + '/notifications/check/available',
        headers: {
          'Authorization': "Bearer " + token
        }
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          setExistingFiles(prev => [...response.data.map(item => ({
            ...item, statut: "En attente"
          }))])
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  }

  const checkSent = () => {
    if (keycloak.authenticated) {
      console.log(keycloak)
      let token = keycloak.token
      var config = {
        method: 'get',
        url: process.env.REACT_APP_ENDPOINT + '/notifications/check/sent',
        headers: {
          'Authorization': "Bearer " + token
        }
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          setSentFiles(prev => [...response.data.map(item => ({
            ...item, statut: "Envoyé"
          }))])
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  }

  const checkError = () => {
    if (keycloak.authenticated) {
      console.log(keycloak)
      let token = keycloak.token
      var config = {
        method: 'get',
        url: process.env.REACT_APP_ENDPOINT + '/notifications/check/error',
        headers: {
          'Authorization': "Bearer " + token
        }
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          setErrorFiles(prev => [...response.data.map(item => ({
            ...item, statut: "Erroné"
          }))])
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  }

  const fetchContent = (path) => {
    if (keycloak) {
      var data = {
        filePath: path
      };
      var config = {
        method: 'post',
        url: process.env.REACT_APP_ENDPOINT + '/notifications/read',
        headers: {
          'Authorization': "Bearer " + keycloak.token
        },
        data
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          setContentFile(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const sendMail = (path) => {
    setLoading(true)
    if (keycloak) {
      var data = {
        filePath: path
      };
      var config = {
        method: 'post',
        url: process.env.REACT_APP_ENDPOINT + '/notifications/send',
        headers: {
          'Authorization': "Bearer " + keycloak.token
        },
        data
      };

      axios(config)
        .then(function (response) {
          setLoading(false)
          setVisible(true)
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false)
        });
    }
  }


  return (
    <div>
      <h1 style={{ fontSize: "3.3em", textAlign: "center", paddingTop: "30px" }}>
        Notifications Marketing
      </h1>
      <h2 style={{ fontSize: "1.6em" }} >
        Fichiers disponibles pour envoi automatique
      </h2>
      <Table data={formatData(existingFiles)} columns={columnsAvailableFiles} />
      <Divider />
      <h2 style={{ fontSize: "1.6em" }}>
        Fichiers envoyés avec succès</h2>
      <Table data={formatData(sentFiles)} columns={columnsSentFiles} />

      <Divider />
      <h2 style={{ fontSize: "1.6em" }}>
        Fichiers non envoyés</h2>
      <Table data={formatData(errorFiles)} columns={columnsErrorFiles} />


      <Drawer
        title={`Contenu`}
        placement="right"
        width={1000}
        onClose={onClose}
        visible={showPreview}
      >
        <Table data={contentFile} columns={columns} />
      </Drawer>


      {/* {existingFiles.length > 0 ?
        existingFiles.map(item => (
          <div className="site-card-wrapper">
            <Row gutter={16}>
              <Col span={8}>
                <div className="row-text">
                  <h2><b>Un nouveau fichier est disponible</b></h2>
                </div>
                <div className="row-text">
                  <h2><b> Date de création :</b></h2>
                  <h2>{item.dateCreation}</h2>
                </div>
              </Col>

              <Col span={8} />

              <Col span={8}>
                <Button onClick={() => handlePreview(item.path)}>{showPreview ? 'Masquer le contenu' : 'Visualiser le contenu'}</Button>
                <Button loading={loading} onClick={() => sendMail(item.path)}>Envoyer les notifications</Button>
                <Modale title="Envoi de norifications" text="Les notifications mail ont été envoyées" visible={visible} onOk={()=>{setVisible(false); check() }}/>
              </Col>
            </Row>

            {showPreview && <Table data={contentFile} columns={columns} />}
          </div>
        ))
        :

        <Unfound />
      } */}
    </div>
  );
};

export default Main;