namespace NodeServerLauncher
{
    partial class MainForm
    {
        private System.ComponentModel.IContainer components = null;

        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        private void InitializeComponent()
        {
            this.txtFilePath = new System.Windows.Forms.TextBox();
            this.btnSelectFile = new System.Windows.Forms.Button();
            this.btnRunServer = new System.Windows.Forms.Button();
            this.btnStatusIndicator = new System.Windows.Forms.Button();
            this.btnStopServer = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // txtFilePath
            // 
            this.txtFilePath.Location = new System.Drawing.Point(12, 12);
            this.txtFilePath.Name = "txtFilePath";
            this.txtFilePath.Size = new System.Drawing.Size(400, 20);
            this.txtFilePath.TabIndex = 0;
            // 
            // btnSelectFile
            // 
            this.btnSelectFile.Location = new System.Drawing.Point(418, 10);
            this.btnSelectFile.Name = "btnSelectFile";
            this.btnSelectFile.Size = new System.Drawing.Size(75, 23);
            this.btnSelectFile.TabIndex = 1;
            this.btnSelectFile.Text = "Examinar";
            this.btnSelectFile.UseVisualStyleBackColor = true;
            this.btnSelectFile.Click += new System.EventHandler(this.btnSelectFile_Click);
            // 
            // btnRunServer
            // 
            this.btnRunServer.Location = new System.Drawing.Point(12, 38);
            this.btnRunServer.Name = "btnRunServer";
            this.btnRunServer.Size = new System.Drawing.Size(240, 23);
            this.btnRunServer.TabIndex = 2;
            this.btnRunServer.Text = "Iniciar Servidor Node.js";
            this.btnRunServer.UseVisualStyleBackColor = true;
            this.btnRunServer.Click += new System.EventHandler(this.btnRunServer_Click);
            // 
            // btnStatusIndicator
            // 
            this.btnStatusIndicator.Enabled = false;
            this.btnStatusIndicator.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnStatusIndicator.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnStatusIndicator.Location = new System.Drawing.Point(12, 67);
            this.btnStatusIndicator.Name = "btnStatusIndicator";
            this.btnStatusIndicator.Size = new System.Drawing.Size(481, 35);
            this.btnStatusIndicator.TabIndex = 3;
            this.btnStatusIndicator.Text = "SERVIDOR DETENIDO";
            this.btnStatusIndicator.UseVisualStyleBackColor = true;
            // 
            // btnStopServer
            // 
            this.btnStopServer.Location = new System.Drawing.Point(258, 38);
            this.btnStopServer.Name = "btnStopServer";
            this.btnStopServer.Size = new System.Drawing.Size(235, 23);
            this.btnStopServer.TabIndex = 4;
            this.btnStopServer.Text = "Detener Servidor";
            this.btnStopServer.UseVisualStyleBackColor = true;
            this.btnStopServer.Click += new System.EventHandler(this.btnStopServer_Click);
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(505, 114);
            this.Controls.Add(this.btnStopServer);
            this.Controls.Add(this.btnStatusIndicator);
            this.Controls.Add(this.btnRunServer);
            this.Controls.Add(this.btnSelectFile);
            this.Controls.Add(this.txtFilePath);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.MaximizeBox = false;
            this.Name = "MainForm";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Node.js Server Launcher";
            this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.MainForm_FormClosing);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        private System.Windows.Forms.TextBox txtFilePath;
        private System.Windows.Forms.Button btnSelectFile;
        private System.Windows.Forms.Button btnRunServer;
        private System.Windows.Forms.Button btnStatusIndicator;
        private System.Windows.Forms.Button btnStopServer;
    }
}