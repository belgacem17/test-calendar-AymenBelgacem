import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.Document;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

public class Commande {
    String NameMedhode;
    String TpyeFile;
    String WordSearch;
    String WordReplace;
    String WhenSearch;
    String whenResult;
    private List<String> TableLigneFile = new ArrayList<String>();
    private Document document;

    public Commande(String NameMedhode, String TpyeFile, String WordSearch, String WordReplace, String WhenSearch,
            String whenResult) {

        this.NameMedhode = NameMedhode;
        this.TpyeFile = TpyeFile;
        this.WordSearch = WordSearch;
        this.WordReplace = WordReplace;
        this.WhenSearch = WhenSearch;
        this.whenResult = whenResult;
    }

    public void SearchReplace() {
        switch (this.TpyeFile) {
            case "txt":
                GetFileTxt();
                List<String> NewLigneFile = RemplaceWord();
                CreateFileResultTxt(NewLigneFile);
                break;
            case "xml":
                GetFileXML();
                CreateFileXML();
                break;

            default:
                System.out.println("Failed Command");
                break;
        }
    }

    public List<String> GetFileTxt() {

        TableLigneFile = new ArrayList<String>();
        try (Scanner sc = new Scanner(new File(this.WhenSearch))) {
            while (sc.hasNextLine()) {
                String str = sc.nextLine();
                TableLigneFile.add(str);
                System.out.println(str);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        return TableLigneFile;
    }

    public void GetFileXML() {

        DocumentBuilder documentBuilder;
        try {
            documentBuilder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
            document = documentBuilder.parse(this.WhenSearch);
            NodeList nodelist = document.getChildNodes();
            getChildNode(nodelist);
        } catch (ParserConfigurationException | SAXException | IOException e) {
            e.printStackTrace();
        }

    }

    public List<String> RemplaceWord() {

        List<String> NewLigneFile = new ArrayList<String>();
        for (String line : TableLigneFile) {
            String newLine = line;
            if (newLine.indexOf(this.WordSearch) != -1) {
                newLine = newLine.replaceAll(this.WordSearch, this.WordReplace);
            }

            NewLigneFile.add(newLine);
        }
        return NewLigneFile;
    }

    public void CreateFileResultTxt(List<String> NewLignesFile) {
        try {
            FileWriter myWriter = new FileWriter(this.whenResult);
            for (String line : NewLignesFile) {
                myWriter.write(line);
                myWriter.append("\n");
            }
            myWriter.close();
            System.out.println("Successfully wrote to the file.");
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }

    public void getChildNode(NodeList nodelist) {
        for (int count = 0; count < nodelist.getLength(); count++) {
            Node node = nodelist.item(count);
            if (node.getNodeName() != "#text") {

                NodeList childNodes = node.getChildNodes();
                NamedNodeMap nodeMap = node.getAttributes();

                if (nodeMap != null)
                    getAttributeChild(nodeMap);

                getChildNode(childNodes);

            }

        }

    }

    public void getAttributeChild(NamedNodeMap nodeMap) {
        for (int count = 0; count < nodeMap.getLength(); count++) {

            Node node = nodeMap.item(count);
            String valueNode = node.getTextContent();
            System.out.println(this.WordSearch);
            System.out.println(valueNode.toString());
            System.out.println((valueNode.indexOf(this.WordSearch) != -1));
            if ((valueNode.indexOf(this.WordSearch) != -1)) {

                String value = valueNode.replaceAll(this.WordSearch, this.WordReplace);
                System.out.println(value);
                node.setNodeValue(value);
            }

        }

    }

    public void CreateFileXML() {
        try (FileOutputStream output = new FileOutputStream("result.xml")) {

            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            DOMSource source = new DOMSource(document);
            StreamResult result = new StreamResult(output);
            transformer.transform(source, result);
        } catch (IOException | TransformerException e) {
            e.printStackTrace();
        }
    }
}
