import java.util.Scanner;

public class MiniProject {

	public static void main(String[] args) {
		 System.out.println("Hello, World!");
	        String ligneCmd = "";
	        try (Scanner scanner = new Scanner(System.in)) {
	            ligneCmd = scanner.nextLine();

	        }
	        String[] tableArgument = ligneCmd.split(" ");
	        if (tableArgument.length < 6) {
	            System.out.println("Failed Arguments");
	            return;
	        } else if (tableArgument.length > 6) {
	            System.out.println("Failed Arguments: More parametre");
	            return;
	        }
	        String NameMedhode = tableArgument[0];
	        String TpyeFile = tableArgument[1];
	        String WordSearch = tableArgument[2];
	        String WordReplace = tableArgument[3];
	        String WhenSearch = tableArgument[4];
	        String whenResult = tableArgument[5];
	        Commande cmd = new Commande(NameMedhode, TpyeFile, WordSearch, WordReplace, WhenSearch, whenResult);
	        cmd.SearchReplace();
		  
	}

}
