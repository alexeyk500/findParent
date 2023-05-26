import React from 'react';
import './App.css';

type DocumentType = {
  uuid: string;
  code: string;
  parent_uuid: string | null;
}

type DocumentAppType = {
  uuid: string;
  code: string;
  children: DocumentAppType[];
}

const transformDocument = (document: DocumentType): DocumentAppType => {
  return {
    uuid: document.uuid,
    code: document.code,
    children: [],
  }
}

const documents: DocumentType[] = [
  {uuid: "123", code: "01.00", parent_uuid: null},
  {uuid: "234", code: "02.00", parent_uuid: null},
  {uuid: "765", code: "03.00", parent_uuid: null},
  {uuid: "982", code: "04.00", parent_uuid: null},
  {uuid: "876", code: "05.00", parent_uuid: null},
  {uuid: "682", code: "06.00", parent_uuid: null},
  {uuid: "635", code: "07.00", parent_uuid: null},
  {uuid: "098", code: "08.00", parent_uuid: null},
  {uuid: "343", code: "09.00", parent_uuid: null},
  {uuid: "788", code: "10.00", parent_uuid: null},
  {uuid: "999", code: "01.01", parent_uuid: '123'},
  {uuid: "888", code: "02.01", parent_uuid: '234'},
  {uuid: "777", code: "02.02", parent_uuid: '234'},
  {uuid: "666", code: "03.01", parent_uuid: '765'},
  {uuid: "555", code: "03.02", parent_uuid: '765'},
  {uuid: "444", code: "03.03", parent_uuid: '765'},
  {uuid: "331", code: "05.01", parent_uuid: '876'},
  {uuid: "332", code: "05.02", parent_uuid: '876'},
  {uuid: "333", code: "05.03", parent_uuid: '876'},
  {uuid: "334", code: "05.04", parent_uuid: '876'},
  {uuid: "335", code: "05.05", parent_uuid: '876'},
  {uuid: "3331", code: "05.03", parent_uuid: '335'},
  {uuid: "3342", code: "05.04", parent_uuid: '335'},
  {uuid: "3353", code: "05.05", parent_uuid: '335'},
  {uuid: "666", code: "66.66", parent_uuid: '666'},
]

const findParent = (appDocuments: DocumentAppType[], document: DocumentType) => {
  appDocuments.forEach(curDocument => {
    if (curDocument.uuid === document.parent_uuid) {
      const appDocument = transformDocument(document);
      curDocument.children.push(appDocument)
      return
    } else {
      findParent(curDocument.children, document)
    }
  })
}

const makeDocumentsTree = (documents: DocumentType[]): DocumentAppType[] => {
  const documentsTree: DocumentAppType[] = []
  documents.forEach(document => {
    if (document.parent_uuid === null) {
      const appDocument = transformDocument(document);
      documentsTree.push(appDocument)
    } else {
      findParent(documentsTree, document)
    }
  })
  return documentsTree
}

function App() {
  console.log('documents =', documents);
  const documentTree = makeDocumentsTree(documents);
  console.log('documentTree =', documentTree);

  return (
    <div className="App">
      {
        documentTree.map((document, ind) => {
          return <div key={ind}> {document.code} </div>
        })
      }
    </div>
  );
}

export default App;
